require 'rails_helper'
# Needed to add config.include Devise::Test::ControllerHelpers, type: :controller
RSpec.describe StudentsCreationController, type: :controller do

    let(:admin) { create(:user, role: 'admin')}
    let(:user) { create(:user) }


    let(:student_params) do
        {
            email: 'teststudent@student.com',
            admission_average: 10.00,
            en_average: 9.65,
            ro_grade: 8.85,
            mathematics_grade: 6.54,
            mother_tongue: 'German',
            mother_tongue_grade: 7.85,
            graduation_average: 9.85
        }
    end

    before do
        sign_in admin
    end

    describe 'GET #new' do

        it 'renders the new template' do
            get :new
            expect(response).to render_template(:new)
        end

        it 'initializes a new student' do
            get :new
            expect(assigns(:student)).to be_a_new(User)
            # assigns() lets you access instance variables.
        end
    end

    describe 'POST #create' do

        
        context 'with valid params' do
            
            it 'creates a new user with the provided params' do
                expect { post :create, params: { user: student_params } }.to change {User.count}.by(1)
            end

            it 'assigns a random password' do
                allow(SecureRandom).to receive(:hex).and_return('secure_password')

                post :create, params: { user: student_params }
                expect(User.last.valid_password?('secure_password')).to be true
                # valid_password? -> Devise method to check if a string is the 
                # encrypted equiv of what the user stores.
            end

            it 'sends a password reset instruction by email' do
                student = User.new(student_params)
                allow(User).to receive(:new).and_return(student)
                allow(student).to receive(:send_reset_password_instructions)
            
                post :create, params: { user: student_params }
            
                expect(student).to have_received(:send_reset_password_instructions)
            end

            it 'redirects to new_student_path with a success flash' do
                post :create, params: { user: student_params }
                expect(response).to redirect_to(new_student_path)
                expect(flash[:success]).to eq('User created successfully.')
            end
        end

        context 'with invalid params' do
            let(:invalid_student_params) { {email: ''} }
            
            it 'does not create the user' do
                post :create, params: { user: invalid_student_params }
                expect(User.last.email).to_not eq('')
            end

            it 'redirects to new_student_path witha a alert flash' do
                post :create, params: { user: invalid_student_params }
                expect(response).to redirect_to(new_student_path)
                expect(flash[:alert]).to eq('User creation failed!')
            end
        end
    end

    describe 'PATCH #update' do

        context 'with valid params' do

            it 'pulls the specific record by bet id and assigns it to a instance variable' do
                patch :update, params: { id: user.id, user: student_params }
                expect(assigns(:student).id).to eq(user.id)
            end

            it 'updates the student record' do
                old_email = user.email
                expect {
                    patch :update, params: { id: user.id, user: student_params }
                    user.reload
                  }.to change { user.email }.from(old_email).to('teststudent@student.com')
            end
            
            it 'redirects to students_path with a success flash' do
                patch :update, params: { id: user.id, user: student_params }
                expect(flash[:success]).to eq('User updated successfully.')
                expect(response).to redirect_to(students_path)
            end
        end

        context 'with invalid params' do

            it 'redirects to students_path with a alert flash' do
                patch :update, params: { id: user.id, user: student_params.merge(ro_grade: nil) }
                expect(flash[:alert]).to eq('User update failed!')
                expect(response).to redirect_to(students_path)
            end
        end
    end

    describe 'DELETE #destroy' do

        context 'with valid params' do

            it 'pulls the specific record by bet id and assigns it to a instance variable' do
                delete :destroy, params: { id: user.id }
                expect(assigns(:student).id).to eq(user.id)
            end

            it 'deletes the student record' do
                old_email = user.email
                expect {delete :destroy, params: { id: user.id }}.to change { User.count }.by(-1)
            end
            
            it 'redirects to students_path with a success flash' do
                delete :destroy, params: { id: user.id }
                expect(flash[:success]).to eq('User was successfully deleted.')
                expect(response).to redirect_to(students_path)
            end
        end
    end

    describe 'GET #edit' do
        it 'pulls the specific record by bet id and assigns it to a instance variable' do
            get :edit, params: { id: user.id }
            expect(assigns(:student).id).to eq(user.id)
        end

        it 'it renders the #edit view' do
            get :edit, params: { id: user.id }
            expect(assigns(:student).id).to eq(user.id)
        end
    end
end