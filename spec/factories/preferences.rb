FactoryBot.define do
    factory :preference do
      association :user
      association :school_specialization
      priority { 1 }
    end
  end