require 'rails_helper'

RSpec.describe ApplicationController, type: :controller do

  # Change the controller class that the anonymous controller inherits from
  controller(StudentsCreationController) do
    # You can define any actions or methods you need here, or leave this block empty
  end

  describe 'unauthorized requests' do
    
    it 'redirects you back to the root_path with a flash alert' do
      # Given that CanCan::AccessDenied is raised by some functionality in 
      # StudentsCreationController's index action...

      get :index # This will now make a request to StudentsCreationController's index action

      expect(flash[:alert]).to eq('You do not have access to this page.')
      expect(response).to redirect_to(root_path)
    end  
  end
end
