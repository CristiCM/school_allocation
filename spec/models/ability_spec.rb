require 'rails_helper'
require 'cancan/matchers'

RSpec.describe Ability, type: :model do
  subject(:ability) { Ability.new(user) }

  describe 'as an admin' do
    let(:user) { FactoryBot.create(:user, role: 'admin') }

    it 'can manage everything' do
      expect(ability).to be_able_to(:manage, :all)
    end

    it 'cannot manage Preferences' do
      expect(ability).not_to be_able_to(:manage, Preference)
    end
  end

  describe 'as a student' do
    let(:user) { FactoryBot.create(:user, role: 'student') }

    it 'can manage Preferences' do
      expect(ability).to be_able_to(:manage, Preference)
    end

    it 'can read pages' do
      expect(ability).to be_able_to(:read, :pages)
    end
  end

  describe 'as another role' do
    let(:user) { FactoryBot.create(:user, role: 'some_other_role') }

    it 'can read pages' do
      expect(ability).to be_able_to(:read, :pages)
    end
  end

  describe 'as a guest (no role)' do
    let(:user) { User.new }

    it 'can read pages' do
      expect(ability).to be_able_to(:read, :pages)
    end
  end
end
