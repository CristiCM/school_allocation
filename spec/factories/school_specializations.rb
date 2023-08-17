FactoryBot.define do
    factory :school_specialization do
        school  # looks for a school factory
        track   # assigns the id of the created record
        specialization
        spots_available { Faker::Number.between(from: 1, to: 100)}
    end
end