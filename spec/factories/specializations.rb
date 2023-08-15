FactoryBot.define do
    factory :specialization do
        name { Faker::Educator.subject }
    end
end