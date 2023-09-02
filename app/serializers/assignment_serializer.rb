class AssignmentSerializer
    include FastJsonapi::ObjectSerializer
    attributes :id, :user_id, :school_specialization_id, :created_at, :unassigned
end