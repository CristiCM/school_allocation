class StudentsCreationController < ApplicationController
  load_and_authorize_resource :User

  before_action :set_sorting_params, only: [:index, :download]
  before_action :set_students, only: [:new, :index, :download]
  before_action :set_student, only: [:update, :destroy]

  require 'sidekiq/api'

  def new
    if @students.any?
      data = UserSerializer.new(@students).serializable_hash[:data].map {|data| data[:attributes]}
      render_success("Student records.", :ok, data)
    else
      render_error("There are no student records.", :ok)
    end
  end

  def create
    @student = User.new(student_params.merge(password: SecureRandom.hex, role: 'student'))

    if @student.save
      @student.send_reset_password_instructions
      render_success("Student created successfully!", :created, {student: @student})
    else
      render_error(@student.errors.full_messages.to_sentence, :bad_request)
    end
  end

  def update
    if @student.update(student_params)
      render_success("Student updated successfully!", :ok, {student: @student})
    else
      render_error(@student.errors.full_messages.to_sentence, :bad_request)
    end
  end

  def destroy
    if @student.destroy
      render_success("Student deleted successfully!", :ok)
    else
      render_error(@student.errors.full_messages.to_sentence, :bad_request)
    end
  end
  
  # Can receive params: :sort_by, :order, :page(pagination)
  def index
    @students = apply_pagination(@students)
    data = {students: UserSerializer.new(@students).serializable_hash[:data].map {|data| data[:attributes]}}
    render_success("Students, sorted, ordered, paginated", :ok, data)
  end

  # Can receive params: :sort_by, :order
  def download
    data = ExcelGenerator.generate_for_student_creation(@students)
    send_data data, filename: "Students.xlsx", type: Mime::Type.lookup_by_extension('xlsx').to_s
  end

  private

  def set_student
    @student = User.find_by(id: params[:id])
    render_error("Invalid record id!", :not_found) if !@student
  end

  def set_students
    @students = User.where(role: 'student').order("#{@sort_by} #{@order}")
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

  