require 'rails_helper'

RSpec.describe SchoolsCreationImportController, type: :controller do
    
    let!(:admin) { FactoryBot.create(:user, role: 'admin') }

    before do
        sign_in admin
    end

    describe 'POST #create' do
        context 'a valid file is provided' do
            let(:new_data_importer_instance) { double('DataImporter', :import_csv => nil) }
            before do
                allow(DataImporter).to receive(:new).and_return(new_data_importer_instance)
            end

            it 'returns 200 status with proper message' do
                post :create
                parsed_response = JSON.parse(response.body)
                expect(parsed_response["status"]['message']).to eq('Successfully imported!')
                expect(response).to have_http_status(200)
            end
        end

        context 'a invalid file is provided' do
            before do
                allow(DataImporter).to receive(:new).and_raise(StandardError, 'Some error!')
            end

            it 'returns a 400 status' do
                post :create
                expect(response).to have_http_status(400)  
            end
        end
    end
end