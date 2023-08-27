require 'rails_helper'

RSpec.describe SchoolSpecialization, type: :model do

  describe "#display_name" do
    let(:school) { create(:school, name: 'Test School') }
    let(:track) { create(:track, name: 'Test Track') }
    let(:specialization) { create(:specialization, name: 'Test Specialization') }
    let(:school_specialization) do
      create(:school_specialization, school: school, track: track, specialization: specialization)
    end

    it "returns a formatted string with the school, track, and specialization names" do
      expect(school_specialization.display_name).to eq("Test School\t\t\t|\t\t\tTest Track\t\t\t|\t\t\tTest Specialization")
    end
  end


  describe '#display_school' do
    let(:school) { create(:school, name: 'test123') }
    let(:school_specialization) { create(:school_specialization, school_id: school.id) }
    
    it 'returns the school name' do
      expect(school_specialization.display_school).to eq('test123')
    end
  end

  describe '#display_track' do
    let(:track) { create(:track, name: 'test123') }
    let(:school_specialization) { create(:school_specialization, track_id: track.id) }
    
    it 'returns the school name' do
      expect(school_specialization.display_track).to eq('test123')
    end
  end

  describe '#display_specialization' do
    let(:specialization) { create(:specialization, name: 'test123') }
    let(:school_specialization) { create(:school_specialization, specialization_id: specialization.id) }
    
    it 'returns the school name' do
      expect(school_specialization.display_specialization).to eq('test123')
    end
  end
end
