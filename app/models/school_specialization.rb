class SchoolSpecialization < ApplicationRecord
  belongs_to :school, dependent: :destroy
  belongs_to :track, dependent: :destroy
  belongs_to :specialization, dependent: :destroy

  def display_name
    "#{School.find(school_id).name}\t|\t
     #{Track.find(track_id).name}\t|\t
     #{Specialization.find(specialization_id).name}"
  end
end
