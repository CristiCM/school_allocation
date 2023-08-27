FactoryBot.define do
    factory :assignment do
        association :user
        association :school_specialization
    end
end