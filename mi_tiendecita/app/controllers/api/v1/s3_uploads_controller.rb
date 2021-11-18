# frozen_string_literal: true

class Api::V1::S3UploadsController < ApiController
  def set_s3_direct_post
    file_name = params[:file_name]
    directory = params[:directory]
    random_path = SecureRandom.uuid
    key = "uploads/#{directory}/#{random_path}/#{file_name}"

    signer = Aws::S3::Presigner.new
    post_url = signer.presigned_url(:put_object,
                                    bucket: S3_BUCKET.name,
                                    key: key,
                                    acl: 'public-read')
    get_url = "#{S3_BUCKET.url}/#{key}"

    render json: { post_url: post_url, get_url: get_url }, status: :ok
  end
end
