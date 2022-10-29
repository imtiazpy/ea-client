import { NextPageWithLayout } from "./page";
import SidebarLayout from "../components/Layouts/sidebar/SidebarLayout";
import Image from "next/image";
import { DateTimeField, InputField } from "src/components/Common";
import DatePicker from 'react-datepicker';
import { enumHelper, getEnumItem, useApiHelper } from "src/utility";
import Select from 'react-select';
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import AuthContext from "src/context/Auth/AuthContext";

const Profile: NextPageWithLayout = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [formData, setFormData] = useState({
        name: "",
        avatar: "",
        job_seeker_profile: {
            summary: "",
            gender: 1,
            date_of_birth: "",
            city: "",
            country: ""
        }
    });


    const api = useApiHelper()
    const gContext = useContext(AuthContext);


    const onAvatarChange = (e: any) => {
        if (e.target.files[0]) {
            let form_data = new FormData();
            form_data.append('avatar', e.target.files[0], e.target.files[0].name);
            api.uploadAvatar(form_data).then((response: any) => {
                setFormData({...formData, avatar: response.avatar});
                toast("Avatar Upload Successful!")
            }).catch(err => {
                //
            })
        }
    };

    const handleProfileUpdate = () => {
        api.updateJSProfile({...formData, avatar: undefined, job_seeker_profile:{...formData.job_seeker_profile, date_of_birth: startDate.toISOString().split('T')[0]}}).then((response)=>{
            toast.success("Profile updated");
            gContext.setValidationError(null);

        }).catch(err => {
            gContext.validationErrorCB(err.response.data.job_seeker_profile);
            toast.error("Profile update failed!");
        })
    };

    const handleChange = (e: any) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const handleProfileChange = (e: any) => {
        setFormData({
            ...formData, 
            job_seeker_profile: {
                ...formData.job_seeker_profile, [e.target.name]: e.target.value
            }
        })
    };


    useEffect(() => {
        api.getJSProfile().then((response: any) => {
            setFormData(response)
            setStartDate(new Date(response?.job_seeker_profile?.date_of_birth))
        }).catch((err: any) => {
            //
        })
    },[])

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex flex-col items-center justify-around bg-slate-700 p-5">
                <div className="relative p-5 rounded-full overflow-hidden">
                    <Image 
                        src={formData.avatar ? formData.avatar : '/images/one.png'}
                        width={400}
                        height={400}
                        object-fit="contain"
                        className="rounded-full"
                        priority
                    />
                    <label htmlFor="fileUpload" className="absolute top-3/4 right-10 hover:cursor-pointer">
                        <i className="fas fa-camera"></i>
                    </label>
                    <input 
                        type="file" 
                        id="fileUpload" 
                        className="sr-only"
                        onChange={onAvatarChange}
                    />
                    
                </div>
                <div>
                    <InputField 
                        label="Name"
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Your Name"
                        className="rounded-md px-5"
                        defaultValue={formData.name}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div className="col-span-2 bg-slate-700 p-5 w-max-screen">

                <div className="grid grid-cols-1 gap-8 py-10">
                    <div className="grid grid-cols-1 relative">
                        <label
                            htmlFor="summary"
                            className="absolute bg-white px-4 rounded-sm left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                            >
                            Your Career Summary
                        </label>
                        <textarea
                            name="summary"
                            id="summary"
                            cols={30}
                            rows={5}
                            className="border border-b-2 placeholder-transparent border-gray-300 peer focus:outline-none focus:border-blue-600 rounded-md text-gray w-100 pt-4 pl-6"
                            placeholder="About yourself"
                            onChange={handleProfileChange}
                            defaultValue={formData?.job_seeker_profile?.summary}
                        ></textarea>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <DateTimeField 
                            startDate={startDate}
                            setStartDate={setStartDate}
                            placeholderText="When is your birthday"
                        />
                        <div className="relative">
                            <Select 
                                options={enumHelper.gender}
                                value={getEnumItem(enumHelper.gender, formData.job_seeker_profile.gender || 1)}
                                onChange={(e: any) => setFormData({...formData, job_seeker_profile:{...formData.job_seeker_profile, gender: e.value }})}
                            />
                            <label
                                className="absolute bg-white px-4 rounded-sm left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                            >
                                Gender
                            </label>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <InputField 
                            label="City"
                            type="text"
                            name="city"
                            id="city"
                            placeholder="Your City"
                            className="rounded-md px-5"
                            defaultValue={formData?.job_seeker_profile?.city}
                            onChange={handleProfileChange}
                        />
                        <InputField 
                            label="Country"
                            type="text"
                            name="country"
                            id="country"
                            placeholder="Your Country"
                            className="rounded-md px-5"
                            defaultValue={formData?.job_seeker_profile?.country}
                            onChange={handleProfileChange}
                        />
                    </div>
                    <div className="grid grid-cols-1 items-center justify-center">
                        <button
                            className="cursor-pointer bg-blue-600 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-black"
                            onClick={handleProfileUpdate}
                        >
                            Update Profile
                        </button>
                    </div>
                </div>
            </div>

            <div>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse facere tempora deserunt, iusto quos dolorem! Numquam molestiae libero facere, qui veniam voluptas nemo ut a eaque ducimus non commodi animi aperiam nihil ea? Nihil dolorem soluta ipsa iste, voluptates eveniet iusto odio itaque, perferendis iure cum at dicta incidunt animi voluptatem quidem vitae magni fugit provident blanditiis saepe corrupti! Hic quas facere molestias esse! Expedita repudiandae sint hic sed, culpa consectetur, dolor natus consequatur architecto itaque earum! Totam sapiente quaerat temporibus doloribus quo culpa, ullam deleniti, possimus praesentium, recusandae repudiandae tempora? Tempora vel laborum, nesciunt vero quis fugit eaque. Tempore a reiciendis, maxime odit voluptas magnam tenetur amet quo perferendis error facilis ipsa laboriosam quibusdam sint doloremque assumenda magni molestiae doloribus non vitae in animi alias laudantium dolores. Neque quisquam laboriosam iusto corporis? Maxime voluptates doloremque inventore alias magni in enim magnam. Libero porro expedita perferendis, iure recusandae repudiandae quisquam debitis cupiditate quia praesentium? Quam voluptatum laborum dolor quaerat, porro quisquam nostrum excepturi doloribus temporibus nihil illum aut at animi quod possimus iure, amet voluptas facilis eligendi autem necessitatibus! Vel commodi sit minima! Distinctio maxime temporibus porro eos quod placeat, enim modi ratione nihil laudantium voluptatem amet mollitia! Fugit, minus.
            </div>
        </div>
    );
};

export default Profile;


Profile.getLayout = (page) => {
    return <SidebarLayout>{page}</SidebarLayout>
};