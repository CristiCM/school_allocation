require 'rails_helper'

RSpec.describe AssignmentsController, type: :controller do
    let!(:admin) { FactoryBot.create(:user, role: 'admin') }

    before do
        sign_in admin
    end

    describe 'GET #new' do
        it 'renders the new template' do
            get :new
            expect(response).to render_template(:new)
        end
    end
end