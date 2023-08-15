FactoryBot.define do
    factory :school_specialization do
        school_id { Faker::Number.between(from: 1, to: 100)}
        track_id { Faker::Number.between(from: 1, to: 100)}
        specialization_id { Faker::Number.between(from: 1, to: 100)}
        spots_available { Faker::Number.between(from: 1, to: 100)}
    end
end