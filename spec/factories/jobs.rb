FactoryBot.define do
    factory :job do
        first_notification_jid { Faker::String.random(length: 6)}
        first_notification_time { Faker::Time.between_dates(from: Date.today + 10, to: Date.today + 20) }
        second_notification_jid { Faker::String.random(length: 6)}
        second_notification_time { Faker::Time.between_dates(from: Date.today + 10, to: Date.today + 20) }
        allocation_date_jid { Faker::String.random(length: 6)}
        allocation_time { Faker::Time.between_dates(from: Date.today + 10, to: Date.today + 20)}
        allocation_done { false}
    end
end