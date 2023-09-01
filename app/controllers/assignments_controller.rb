class AssignmentsController < ApplicationController
  skip_load_resource only: [:destroy, :show]
  load_and_authorize_resource
  before_action :set_sorting_params, only: [:index, :download]
  before_action :set_assignments, only: [:index, :download]

  def new
    @users = apply_pagination(User.left_outer_joins(:preferences)
             .where(preferences: { id: nil }, role: 'student'))
  end

  def index
    @assignments = apply_pagination(@assignments)
  end

  def download
    respond_to do |format|
      format.xlsx { render xlsx: "download", filename: "assignments.xlsx" }
    end
  end  

  private

  def apply_pagination(assignments)
    assignments.paginate(page: params[:page], per_page: 10)
  end

  def set_assignments
    @assignments = Assignment.includes(user: [], school_specialization: [:school, :track, :specialization])
                            .joins(:user)
                            .order("#{@sort_by} #{@order}")
  end

  def set_sorting_params
    @sort_by = params[:sort_by] || 'users.admission_average'
    @order = params[:order] || 'DESC'
  end

end