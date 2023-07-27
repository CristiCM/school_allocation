class SchoolSpecialization < ApplicationRecord
  belongs_to :school
  belongs_to :track
  belongs_to :specialization

  def display_name
    "#{School.find(school_id).name},  
     #{Track.find(track_id).name},  
     #{Specialization.find(specialization_id).name}"
  end
end
