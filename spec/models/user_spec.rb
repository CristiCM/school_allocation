require 'rails_helper'

RSpec.describe User, type: :model do
    describe 'get_allocation_sorted_student_ids' do
        # By default all the student grades are equal: spec/factories/users.rb
        context 'when sorting by weighted average (0.2 * graduation + 0.8 * admission)' do

            let!(:student1) { FactoryBot.create(:user_test, graduation_average: 7.00, admission_average: 8.00)  } # w_a = 7.80
            let!(:student2) { FactoryBot.create(:user_test, graduation_average: 8.50, admission_average: 10.00) } # w_a = 9.70
            let!(:student3) { FactoryBot.create(:user_test, graduation_average: 6.50, admission_average: 7.50) } # w_a = 7.30
            let!(:student4) { FactoryBot.create(:user_test, graduation_average: 9.40, admission_average: 8.85) } # w_a = 8.96
            
            it 'returns the student ids sorted correctly based on weighted_average' do
                sorted_ids = User.get_allocation_sorted_student_ids
                expect(sorted_ids).to eq([student2.id, student4.id, student1.id, student3.id])
            end
        end

        context 'when sorting by romanian admission grade' do
            let!(:student1) { FactoryBot.create(:user_test, ro_grade: 8.50)}
            let!(:student2) { FactoryBot.create(:user_test, ro_grade: 6.38)}
            let!(:student3) { FactoryBot.create(:user_test, ro_grade: 10.00)}
            let!(:student4) { FactoryBot.create(:user_test, ro_grade: 8.40)}
            
            it 'returns the student ids sorted correctly based on ro_grade' do
                sorted_ids = User.get_allocation_sorted_student_ids
                expect(sorted_ids).to eq([student3.id, student1.id, student4.id, student2.id])
            end
        end

        context 'when sorting by mathematics admission grade' do
            let!(:student1) { FactoryBot.create(:user_test, mathematics_grade: 6.38)}
            let!(:student2) { FactoryBot.create(:user_test, mathematics_grade: 6.00)}
            let!(:student3) { FactoryBot.create(:user_test, mathematics_grade: 8.73)}
            let!(:student4) { FactoryBot.create(:user_test, mathematics_grade: 9.88)}

            it 'returns the student ids sorted correctly based on mathematics_grade' do
                sorted_ids = User.get_allocation_sorted_student_ids
                expect(sorted_ids).to eq([student4.id, student3.id, student1.id, student2.id])
            end
        end

        context 'when sorting by mother tongue grade' do
            let!(:student1) { FactoryBot.create(:user_test, mother_tongue_grade: 6.85)}
            let!(:student2) { FactoryBot.create(:user_test, mother_tongue_grade: 7.35)}
            let!(:student3) { FactoryBot.create(:user_test, mother_tongue_grade: 10.00)}
            let!(:student4) { FactoryBot.create(:user_test, mother_tongue_grade: 8.88)}

            it 'returns the student ids sorted correctly based on mother_tongue_grade' do
                sorted_ids = User.get_allocation_sorted_student_ids
                expect(sorted_ids).to eq([student3.id, student4.id, student2.id, student1.id])
            end
        end
    end
end