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
      redirect_to new_student_path
      
    else
      flash[:alert] = 'User creation failed!'
      redirect_to new_student_path
    end
  end

  def update
  end

  def destroy
  end

  def edit
  end

  def index

  end

  private

  def student_params
    params.require(:user).permit(:email, :admission_average, :en_average, :ro_grade, :mathematics_grade, :mother_tongue, :mother_tongue_grade, :graduation_average)
  end
end

  