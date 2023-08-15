require 'rails_helper'

RSpec.describe SchoolsCreationImportController, type: :controller do
    
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

    describe 'POST #create' do
        context 'a valid file is provided' do
            let(:new_data_importer_instance) { double('DataImporter', :import_csv => nil) }
            before do
                allow(DataImporter).to receive(:new).and_return(new_data_importer_instance)
            end

            it 'redirects to new_school_specialization_path with a success flash' do
                post :create
                expect(response).to redirect_to(new_school_specialization_path)
                expect(flash[:success]).to eq('Successfully imported!')
            end
        end

        context 'a invalid file is provided' do
            before do
                allow(DataImporter).to receive(:new).and_raise(StandardError, 'Some error!')
            end

            it 'renders :new with a alert flash' do
                post :create
                expect(response).to render_template(:new)
                expect(flash[:alert]).to eq('Import failed: Some error!')
            end
        end
    end
end