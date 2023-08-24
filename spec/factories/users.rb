FactoryBot.define do
  factory :user do
      email { Faker::Internet.email }
      password { 'student' }
      admission_average { Faker::Number.between(from: 1.00, to: 10.00).round(2) }
      en_average { Faker::Number.between(from: 1.00, to: 10.00).round(2) }
      graduation_average { Faker::Number.between(from: 1.00, to: 10.00).round(2) }
      ro_grade { Faker::Number.between(from: 1.00, to: 10.00).round(2) }
      mathematics_grade { Faker::Number.between(from: 1.00, to: 10.00).round(2) }
      role { 'student' }

      after(:build) do |record|
          if rand < 0.2
              record.mother_tongue = Faker::Nation.language
              record.mother_tongue_grade = Faker::Number.between(from: 1.00, to: 10.00).round(2)
          else
              record.mother_tongue = nil
              record.mother_tongue_grade = nil
          end
      end
  end

  #Used for RSpec tests.
  #Static/Equal values across the board for individual tie braker testing.
  factory :user_test, class: 'User' do
      email { Faker::Internet.email }
      password { 'password12345' }
      admission_average { 9.00 }
      en_average { 8.80 }
      graduation_average { 8.50 }
      ro_grade { 7.80 }
      mathematics_grade { 9.50 }
      mother_tongue { 'German' }
      mother_tongue_grade { 8.00 }
      role { 'student' }
  end
end
