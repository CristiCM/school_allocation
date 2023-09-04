FactoryBot.define do
    factory :school_specialization do
        association :school  # looks for a school factory
        association :track   # assigns the id of the created record
        association :specialization
        spots_available { Faker::Number.between(from: 20, to: 200)}
    end
end