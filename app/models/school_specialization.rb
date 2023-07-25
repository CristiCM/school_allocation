class SchoolSpecialization < ApplicationRecord
  belongs_to :school
  belongs_to :track
  belongs_to :specialization
end
