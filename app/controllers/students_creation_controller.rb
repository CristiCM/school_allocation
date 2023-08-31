class StudentsCreationController < ApplicationController
  load_and_authorize_resource :User

  before_action :set_sorting_params, only: [:index, :download]
  before_action :set_users, only: [:index, :download]

  require 'sidekiq/api'

  def new
    students = User.where(role: 'student')

    if students.any?
      data = UserSerializer.new(students).serializable_hash[:data].map {|data| data[:attributes]}
      render_success("Student records.", :ok, data)
    else
      render_error("There are no student records.", :no_content)
    end
  end

  def create
    @student = User.new(student_params.merge(password: SecureRandom.hex, role: 'student'))

    if @student.save
      @student.send_reset_password_instructions
      render_success("Student created successfully!", :created, {student: @student})
    else
      render_error(@student.errors.full_messages.join(', '), :not_acceptable)
    end
  end

  def update
    @student = User.find_by(params[:id])

    if !@student
      render_error("Invalid record id!", :not_found)
    elsif @student.update(student_params)
      render_success("Student updated successfully!", :ok, {student: @student})
    else
      render_error(@student.errors.full_messages.join(', '), :bad_request)
    end
  end

  def destroy
    @student = User.find_by(params[:id])
    
    if !@student
      render_error("Invalid record id!", :not_found)
    elsif @student.destroy
      render_success("Student deleted successfully!", :ok)
    else
      render_error(@sutdent.errors.full_messages.join(', '), :bad_request)
    end
  end
  
  # Can receive params: :sort_by, :order, :page(pagination)
  def index
    @users = apply_pagination(@users)
    data = {students: UserSerializer.new(@users).serializable_hash[:data].map {|data| data[:attributes]}}
    render_success("Students, sorted, ordered, paginated", :ok, data)
  end

  # Can receive params: :sort_by, :order
  def download
    data = ExcelGenerator.generate_for_student_creation(@users)
    send_data data, filename: "Students.xlsx", type: Mime::Type.lookup_by_extension('xlsx').to_s
  end

  private

  def set_users
    @users = User.where(role: 'student').order("#{@sort_by} #{@order}")
  end

  def apply_pagination(users)
    users.paginate(page: params[:page], per_page: 10)
  end

  def set_sorting_params
    @sort_by = params[:sort_by] || 'users.created_at'
    @order = params[:order] || 'DESC'
  end

  def student_params
    params.require(:user).permit(:email, :admission_average, :en_average, :ro_grade, :mathematics_grade, :mother_tongue, :mother_tongue_grade, :graduation_average)
  end
end

  