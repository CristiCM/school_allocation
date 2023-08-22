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
end
