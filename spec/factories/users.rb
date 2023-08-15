FactoryBot.define do
    factory :user do
        email { Faker::Internet.email }
        password { 'password12345'}
        admission_average { 9.00 }
        graduation_average { 8.50 }
        ro_grade { 7.80 }
        mathematics_grade { 9.50 }
        mother_tongue { 'German' }
        mother_tongue_grade { 8.00 }
        role { 'student' }
    end
end