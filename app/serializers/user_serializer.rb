class UserSerializer
    include FastJsonapi::ObjectSerializer
    attributes :id, :email, :created_at, :admission_average, :en_average,:ro_grade, :mathematics_grade, :mother_tongue, :mother_tongue_grade, :graduation_average, :role, :jti
end

#   We can access serializer data for single record by,
#   UserSerializer.new(resource).serializable_hash[:data][:attributes]
#   And multiple records by,
#   UserSerializer.new(resource).serializable_hash[:data].map{|data| data[:attributes]}