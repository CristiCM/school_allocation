class AllocationWorker
    include Sidekiq::Worker
    UNASSIGNED_SPECIALIZATION_ID = -404

    def perform(sorted_students_ids)
        sorted_students_ids.each do |id|
            user = User.find(id)
            placed = assign_to_preference(user) || assign_to_default(user)
        end
    end

    private

    def assign_to_preference(user)
        user.preferences.each do |preference|
            specialization = SchoolSpecialization.find(preference[:school_specialization_id])
            if specialization[:spots_available] > 0
                ActiveRecord::Base.transaction do
                    Assignment.create(user_id: user.id, school_specialization_id: specialization.id)
                    specialization.decrement!(:spots_available)
                end
                return true
            end
        end
        false
    end

    def assign_to_default(user)
        Assignment.create(user_id: user.id, school_specialization_id: UNASSIGNED_SPECIALIZATION_ID)
    end
end