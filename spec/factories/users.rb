FactoryBot.define do
    factory :user do
        email { Faker::Internet.email }
        password { 'student'}
        admission_average { Faker::Number.between(from: 1.00, to: 10.00).round(2) }
        en_average { Faker::Number.between(from: 1.00, to: 10.00).round(2) }
        graduation_average { Faker::Number.between(from: 1.00, to: 10.00).round(2) }
        ro_grade { Faker::Number.between(from: 1.00, to: 10.00).round(2) }
        mathematics_grade { Faker::Number.between(from: 1.00, to: 10.00).round(2) }
        role { 'student' }
    end

    after(:build) do |record|
        if record.is_a?(User)
          if rand < 0.2
            record.mother_tongue = Faker::Nation.language
            record.mother_tongue_grade = Faker::Number.between(from: 1.00, to: 10.00).round(2)
          else
            record.mother_tongue = nil
            record.mother_tongue_grade = nil
          end
        end
    end
end
      