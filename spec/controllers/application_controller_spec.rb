require 'rails_helper'

RSpec.describe ApplicationController, type: :controller do

  controller(StudentsCreationController) do
  end

  describe 'unauthorized requests' do
    
    it 'returns a unauthorized 401 status' do
      request.headers['Authorization'] = "Invalid Token"
      get :index 
      expect(response).to have_http_status(401)
    end
  end
end
