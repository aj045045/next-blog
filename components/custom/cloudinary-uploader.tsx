import { CldUploadButton } from 'next-cloudinary';
import { Upload } from 'lucide-react';

interface CloudinaryUploaderProps {
    onUploadSuccess: (publicId: string) => void;
}

export const CloudinaryUploader = ({ onUploadSuccess }: CloudinaryUploaderProps) => {
    return (
        <div className="flex items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
            <CldUploadButton
                uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME!}
                options={{ sources: ['local', 'url', 'unsplash', 'camera'] }}
                onSuccess={(result: any) => {
                    const publicId = result?.info?.public_id;
                    if (publicId) {
                        onUploadSuccess(publicId);
                    }
                }}
                className="transition ease-in-out delay-200"
            >
                <div className="flex items-center justify-center w-full h-64 max-w-lg p-8 transition-all border-4 border-gray-400 border-dashed rounded-lg hover:text-blue-600 bg-gray-50 hover:bg-gray-100 hover:border-blue-600">
                    <div className="text-center">
                        <Upload
                            className="w-12 h-12 mx-auto mb-4 text-gray-600 transition-transform transform hover:scale-110"
                        />
                        <p className="text-lg font-medium text-gray-600">
                            Drag & drop an image here, or click to select one
                        </p>
                        <p className="mt-2 text-sm text-gray-400">
                            PNG, JPG, JPEG up to 10MB
                        </p>
                    </div>
                </div>
            </CldUploadButton>
        </div>
    );
};


{/* <CloudinaryUploader
onUploadSuccess={(publicId) => setValue('imagePublicId', publicId)}
/> */}