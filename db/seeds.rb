# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

if Rails.env.development? || Rails.env.production?  
    # This seed is ment to make the environment allocation ready.

    # Admin accounts: 1
    # Admin email: admin@admin.com
    # Admin password: 123456

    # Populates School/Track/Specialization models(equiv import data by admin).
    
    # Populates SchoolSpecialization model(equiv creation of school specializations by admin).

    # Populates Preferences model(equiv creation of preferences by each student).

    # SCHOOL, TRACK, SPECIALIZATION CREATION

    FactoryBot.create_list(:school_specialization, 6)

    # USER CREATION

    User.create(email: 'admin@admin.com', password: '123456', role: 'admin')

    350.times do
        user = FactoryBot.create(:user)
    end

    User.where(role: 'student').each do |student|
        rand(7).times do
            spec = rand(1..7)
            student.preferences.find_or_create_by(school_specialization_id: spec) do |preference|
                preference.priority = (student.preferences.maximum(:priority) || 0) + 1
            end
        end
    end
    
    
    # JOB RECORD CREATION
    Job.create!
end