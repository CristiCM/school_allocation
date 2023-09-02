class ExcelGenerator

    def self.generate_for_school_specializations(school_specializations)
      p = Axlsx::Package.new
      wb = p.workbook
    
        wb.add_worksheet(name: "school_specialization") do |sheet|
            sheet.add_row ["Options", "Available Spots"]
    
            school_specializations.each do |school_specialization|
            sheet.add_row [
                school_specialization.display_name,
                school_specialization.spots_available
            ]
            end
        end
  
      p.to_stream.read
    end

    def self.generate_for_student_creation(students)
       p = Axlsx::Package.new
       wb = p.workbook
       
       wb.add_worksheet(name: "students") do |sheet|
        sheet.add_row ["Email", "Creation Time"]
        
            students.each do |student|
                sheet.add_row [
                    student.email,
                    student.created_at
                ]
            end
        end

        p.to_stream.read
    end

    def self.generate_for_student_assignment(assignments)
        p = Axlsx::Package.new
        wb = p.workbook

        wb.add_worksheet(name: "assignments") do |sheet|
            sheet.add_row ["Email", "Admission average", "English average", "Romanian grade", "Mathematics grade", "Mother tongue", "Mother tongue grade", "Graduation average", "School", "Track", "Specialization"]

            assignments.each do |assignment|
                sheet.add_row [
                assignment.user.email,
                assignment.user.admission_average,
                assignment.user.en_average,
                assignment.user.ro_grade,
                assignment.user.mathematics_grade,
                assignment.user.mother_tongue,
                assignment.user.mother_tongue_grade,
                assignment.user.graduation_average,
                assignment.school_specialization.school.name,
                assignment.school_specialization.track.name,
                assignment.school_specialization.specialization.name
                ]
            end
        end

        p.to_stream.read
    end
end