class Preference < ApplicationRecord
  belongs_to :user
  belongs_to :school_specialization
  validates :school_specialization_id, uniqueness: { scope: :user_id, message: "You have already chosen this specialization." }
end
