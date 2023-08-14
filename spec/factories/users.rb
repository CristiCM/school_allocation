FactoryBot.define do
    factory :user do
        email { Faker::Internet.email }
        password { 'password12345'}
        admission_average { Faker::Number.between(from: 1.0, to: 10.0).round(2) }
        en_average { Faker::Number.between(from: 1.0, to: 10.0).round(2) }
        ro_grade { Faker::Number.between(from: 1.0, to: 10.0).round(2) }
        mathematics_grade { Faker::Number.between(from: 1.0, to: 10.0).round(2) }
        mother_tongue { rand < 0.05 ? Faker::Nation.language : nil }
        mother_tongue_grade { rand < 0.05 ? Faker::Number.between(from: 1.0, to: 10.0).round(2) : nil }
        graduation_average { Faker::Number.between(from: 1.0, to: 10.0).round(2) }
        role { 'student' }
    end
end