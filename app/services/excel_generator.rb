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
    
  end