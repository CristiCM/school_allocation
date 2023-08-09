class StudentsCreationController < ApplicationController
    before_action :verify_admin
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
        redirect_to new_student_path, notice: "User created successfully."
      else
        render :new, status: :unprocessable_entity
      end
    end

    def update
    end

    def overview
    end

  

    private

    def student_params
      params.require(:user).permit(:email, :admission_average, :en_average, :ro_grade, :mathematics_grade, :mother_tongue, :mother_tongue_grade, :graduation_average)
    end


  end

  