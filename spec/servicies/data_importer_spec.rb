require 'rails_helper'

RSpec.describe DataImporter do

    describe 'import_csv' do

        context 'when file is not a CSV' do
            let(:fake_file) { instance_double(File, path: 'path/to/file.txt') }
            it 'raises an error' do
                expect { DataImporter.new(fake_file).import_csv }.to raise_error('The file is not in the correct format (.csv).')
            end
        end
        
        context 'when headers are invalid' do
            let(:fake_file) { instance_double(File, path: 'path/to/file.csv') }
            let(:fake_spreadsheet) { instance_double('Spreadsheet', row: ['invalid', 'headers']) }
        
            before do
            allow(Roo::Spreadsheet).to receive(:open).and_return(fake_spreadsheet)
            end
        
            it 'raises an error' do
            expect { DataImporter.new(fake_file).import_csv }.to raise_error('Invalid spreadsheet headers.')
            end
        end

        context 'when data is valid' do
            let(:fake_file) { instance_double(File, path: 'path/to/file.csv') }
            let(:fake_spreadsheet) { instance_double('Spreadsheet', row: ['school', 'track', 'specialization'])}

            before do
                allow(Roo::Spreadsheet).to receive(:open).and_return(fake_spreadsheet)

                allow(School).to receive(:import).with(fake_file, 'school')
                allow(Track).to receive(:import).with(fake_file, 'track')
                allow(Specialization).to receive(:import).with(fake_file, 'specialization')
            end

            it 'imports data correctly' do
                DataImporter.new(fake_file).import_csv
                expect(School).to have_received(:import).with(fake_file, 'school')
                expect(Track).to have_received(:import).with(fake_file, 'track')
                expect(Specialization).to have_received(:import).with(fake_file, 'specialization')
            end
        end
    end
  end
  

