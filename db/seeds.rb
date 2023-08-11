# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

if Rails.env.development?

    # USER CREATION

    # Admin email: admin@admin.com
    # Admin password: 123456

    # Student emails: studentX@student.com -> X = (1-6)
    # Student passwords: student

    users_data = [
        { email: 'admin@admin.com', password: '123456', role: 'admin'},
        { email: 'student1@student.com', password: 'student', admission_average: 8.33, en_average: 8.4, ro_grade: 8.6, mathematics_grade: 8.0, graduation_average: 9.0, mother_tongue: nil, mother_tongue_grade: nil, role: 'student' },
        { email: 'student2@student.com', password: 'student', admission_average: 8.53, en_average: 8.5, ro_grade: 8.6, mathematics_grade: 8.5, graduation_average: 9.0, mother_tongue: nil, mother_tongue_grade: nil, role: 'student' },
        { email: 'student3@student.com', password: 'student', admission_average: 8.6, en_average: 8.6, ro_grade: 8.7, mathematics_grade: 8.5, graduation_average: 9.0, mother_tongue: nil, mother_tongue_grade: nil, role: 'student' },
        { email: 'student4@student.com', password: 'student', admission_average: 8.63, en_average: 8.7, ro_grade: 8.7, mathematics_grade: 8.5, graduation_average: 9.0, mother_tongue: nil, mother_tongue_grade: nil, role: 'student' },
        { email: 'student5@student.com', password: 'student', admission_average: 8.56, en_average: 8.5, ro_grade: 8.7, mathematics_grade: 8.5, mother_tongue: 'Hungarian', mother_tongue_grade: 9.5, graduation_average: 8.9, role: 'student' },
        { email: 'student6@student.com', password: 'student', admission_average: 8.53, en_average: 8.5, ro_grade: 8.7, mathematics_grade: 8.4, mother_tongue: 'Hungarian', mother_tongue_grade: 9.4, graduation_average: 8.9, role: 'student' }
      ]

      
    # SCHOOL, TRACK, SPECIALIZATION CREATION

    schools_data = [
        {name: 'LICEUL TEORETIC "AVRAM IANCU"'},
        {name: 'COLEGIUL NATIONAL "EMIL RACOVITA"'},
        {name: 'LICEUL TEORETIC "NICOLAE BALCESCU"'},
        {name: 'LICEUL DE INFORMATICA "TIBERIU POPOVICIU"'},
        {name: 'LICEUL TEORETIC "ONISIFOR GHIBU"'},
        {name: 'COLEGIUL NAȚIONAL "GHEORGHE SINCAI"'},
        {name: 'COLEGIUL NATIONAL "GEORGE BARITIU"'},
        {name: 'LICEUL TEORETIC "LUCIAN BLAGA"'},
        {name: 'LICEUL TEORETIC "MIHAI EMINESCU"'},
        {name: 'LICEUL UNITARIAN "JANOS ZSIGMOND"'},
        {name: 'SEMINARUL TEOLOGIC ORTODOX'},
        {name: 'COLEGIUL NATIONAL "GEORGE COSBUC"'},
        {name: 'LICEUL TEORETIC "VICTOR BABES"'},
        {name: 'LICEUL TEORETIC "EUGEN PORA"'},
        {name: 'COLEGIUL NATIONAL PEDAGOGIC "GHEORGHE LAZAR"'},
        {name: 'COLEGIUL ECONOMIC "IULIAN POP"'},
        {name: 'LICEUL TEORETIC "APACZAI CSERE JANOS"'},
        {name: 'LICEUL GRECO-CATOLIC "INOCHENTIE MICU"'},
        {name: 'LICEUL TEORETIC "BATHORY ISTVAN"'},
        {name: 'LICEUL TEOLOGIC BAPTIST "EMANUEL"'},
        {name: 'COLEGIUL TEHNIC DE COMUNICATII "AUGUSTIN MAIOR"'},
        {name: 'COLEGIUL TEHNIC "ANA ASLAN"'},
        {name: 'LICEUL TEHNOLOGIC "ALEXANDRU BORZA"'},
        {name: 'LICEUL TEOLOGIC ADVENTIST "MARANATHA"'},
        {name: 'LICEUL TEOLOGIC REFORMAT'},
        {name: 'COLEGIUL TEHNIC DE TRANSPORTURI "TRANSILVANIA"'},
        {name: 'COLEGIUL TEHNIC ENERGETIC'},
        {name: 'COLEGIUL TEHNIC "NAPOCA"'},
        {name: 'COLEGIUL TEHNIC "RALUCA RIPAN"'},
        {name: 'COLEGIUL TEHNIC "ANGHEL SALIGNY"'},
        {name: 'LICEUL TEORETIC "BRASSAI SAMUEL"'},
        {name: 'LICEUL TEHNOLOGIC "AUREL VLAICU"'},
        {name: 'LICEUL TEHNOLOGIC UCECOM "SPIRU HARET"'}
      ]

    tracks_data = [
        {name: 'Real'},
        {name: 'Uman'},
        {name: 'Servicii'},
        {name: 'Tehnic'},
        {name: 'Resurse naturale si protectia mediului'},
    ]

    specializations_data = [
        {name: 'Matematica-Informatica'},
        {name: 'Stiinte ale Naturii'},
        {name: 'Filologie'},
        {name: 'Stiinte Sociale'},
        {name: 'Economic'},
        {name: 'Turism si alimentatie'},
        {name: 'Comert'},
        {name: 'Productie media'},
        {name: 'Electronica automatizari'},
        {name: 'Protectia mediului'},
        {name: 'Electric'},
        {name: 'Chimie industriala'},
        {name: 'Estetica si igiena corpului omenesc'},
        {name: 'Industrie alimentara'},
        {name: 'Constructii, instalatii si lucrari publice'},
        {name: 'Mecanica'},
        {name: 'Electromecanica'}
    ]

    users_data.each do |user_data|
        User.create!(user_data)
    end

    schools_data.each do |school_data|
        School.create!(school_data)
    end

    tracks_data.each do |track_data|
        Track.create!(track_data)
    end

    specializations_data.each do |specialization_data|
        Specialization.create!(specialization_data)
    end


    # SCHOOLSPECIALIZATION CREATION

    schools = [
        School.find_by(name: 'LICEUL TEORETIC "NICOLAE BALCESCU"'),
        School.find_by(name: 'LICEUL DE INFORMATICA "TIBERIU POPOVICIU"'),
        School.find_by(name: 'LICEUL TEORETIC "LUCIAN BLAGA"')
    ]

    tracks = [
        Track.find_by(name: 'Real'),
        Track.find_by(name: 'Real'),
        Track.find_by(name: 'Uman')
    ]

    specializations = [
        Specialization.find_by(name: 'Stiinte ale Naturii'),
        Specialization.find_by(name: 'Matematica-Informatica'),
        Specialization.find_by(name: 'Filologie')
    ]

    3.times do |index|
        SchoolSpecialization.create!(school_id: schools[index].id, track_id: tracks[index].id, specialization_id: specializations[index].id, spots_available: 2)
    end


    # PREFERENCE CREATION
    
    school_specializations = SchoolSpecialization.all
    User.all.each do |user|
        3.times do |index|
            Preference.create!(user_id: user.id, school_specialization_id: school_specializations[index].id, priority: index + 1)
        end
    end
end