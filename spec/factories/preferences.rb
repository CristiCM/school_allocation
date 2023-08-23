FactoryBot.define do
  factory :preference do
    association :user
    association :school_specialization
    priority do
      (user.preferences.maximum(:priority) || 0) + 1
    end
  end
end
