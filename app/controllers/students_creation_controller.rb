class StudentsCreationController < ApplicationController
  load_and_authorize_resource :User
  require 'sidekiq/api'

  def new
    @student = User.new
  end

  def create
    @student = User.new(student_params)
    @student.password = SecureRandom.hex
    @student.role = "student"

    if @student.save
      @student.send_reset_password_instructions
      flash[:success] = 'User created successfully.'
    else
      flash[:alert] = 'User creation failed!'
    end
    redirect_to new_student_path
  end

  def update
    @student = User.find(params[:id])
    if @student.update(student_params)
      flash[:success] = 'User updated successfully.'
    else
      flash[:alert] = 'User update failed!'
    end
    redirect_to students_path
  end

  def destroy
    @student = User.find(params[:id])
    
    @student.destroy
    flash[:success] = 'User was successfully deleted.'
    
    redirect_to students_path
  end

  def edit
    @student = User.find(params[:id])
  end

  def index

  end

  private

  def student_params
    params.require(:user).permit(:email, :admission_average, :en_average, :ro_grade, :mathematics_grade, :mother_tongue, :mother_tongue_grade, :graduation_average)
  end
end

  