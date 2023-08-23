class AllocationWorker
    include Sidekiq::Worker

    def perform(sorted_students_ids)
        sorted_students_ids.each do |id|
            user = User.find(id)
            placed = assign_to_preference_spot(user) || assign_to_unassigned_spot(user)
        end

        Job.first.update(allocation_date_jid: nil, allocation_time: nil)
        EmailWorker.perform_async("allocation_result_notification_email")
    end

    private

    def assign_to_preference_spot(user)
        user.preferences.sort_by(&:priority).each do |preference|
            specialization = SchoolSpecialization.find(preference[:school_specialization_id])
            if specialization[:spots_available] > 0
                ActiveRecord::Base.transaction do
                    Assignment.create(user_id: user.id, school_specialization_id: specialization.id)
                end
                return true
            end
        end
        false
    end

    def assign_to_unassigned_spot(user)
        school = School.find_or_create_by(name: "Unassigned School")
        track = Track.find_or_create_by(name: "Unassigned Track")
        specialization = Specialization.find_or_create_by(name: "Unassigned Specialization")
        school_specialization = SchoolSpecialization.find_or_create_by(school_id: school.id, track_id: track.id, specialization_id: specialization.id, spots_available: 99999)

        Assignment.create!(user_id: user.id, school_specialization_id: school_specialization.id, unassigned: true)
    end    
end
