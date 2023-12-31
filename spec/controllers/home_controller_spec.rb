require 'rails_helper'

RSpec.describe HomesController, type: :controller do
    describe 'GET #new' do
        it 'renders the new template' do
            get :new
            expect(response).to render_template(:new)
        end
    end
end