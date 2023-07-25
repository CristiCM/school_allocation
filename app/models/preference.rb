class Preference < ApplicationRecord
  belongs_to :user
  belongs_to :school_specialization
end
