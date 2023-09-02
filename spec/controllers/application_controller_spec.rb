require 'rails_helper'

RSpec.describe ApplicationController, type: :controller do

  controller(StudentsCreationController) do
  end

  describe 'unauthorized requests' do
    
    it 'returns a 403 status' do
      get :index 
      expect(response).to have_http_status(403)
    end
  end
end
