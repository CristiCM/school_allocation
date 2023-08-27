require 'rails_helper'

RSpec.describe ApplicationController, type: :controller do

  controller(StudentsCreationController) do
  end

  describe 'unauthorized requests' do
    
    it 'redirects you back to the root_path with a flash alert' do

      get :index

      expect(flash[:alert]).to eq('You do not have access to this page.')
      expect(response).to redirect_to(root_path)
    end  
  end
end
