class AssignmentsController < ApplicationController
  before_action :authentificate_request
  authorize_resource
  skip_before_action :verify_authenticity_token
  before_action :set_no_preference_students, only: :new
  before_action :set_sorting_params, only: [:index, :download]
  before_action :set_assignments, only: [:index, :download]

  # No-Preferences Students, Allows params[:page]
  def new
    data = UserSerializer.new(@students).serializable_hash[:data].map {|data| data[:attributes]}
    if @students.empty?
      render_success("All students have preferences!", :no_content, data)
    else
      render_success("Students with no preferences!", :ok, data)
    end
  end

  def index
    @assignments = apply_pagination(@assignments)
    data = {
      assignments: @assignments.map do |assignment|
        {
          assignment: AssignmentSerializer.new(assignment).serializable_hash[:data][:attributes],
          user: UserSerializer.new(assignment.user).serializable_hash[:data][:attributes]
        }
      end
    }

    if @assignments.empty?
      render_success("There are no assignments", :no_content, data)
    else
      render_success("List of assignments", :ok, data)
    end
  end
  

  def download
    data = ExcelGenerator.generate_for_student_assignment(@assignments)
    send_data data, filename: "Assignments.xlsx", type: Mime::Type.lookup_by_extension('xlsx').to_s
  end  

  private

  def apply_pagination(assignments)
    assignments.paginate(page: params[:page], per_page: 10)
  end

  def set_assignments
    @assignments = Assignment.includes(user: [], school_specialization: [:school, :track, :specialization]).order("#{@sort_by} #{@order}")
  end  

  def set_sorting_params
    @sort_by = params[:sort_by] || 'users.admission_average'
    @order = params[:order] || 'DESC'
  end

  def set_no_preference_students
    @students = apply_pagination(User.includes(:preferences)
                                      .where(role: 'student')
                                      .where(preferences: { id: nil }))
  end
end