/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { fetcher } from "@/lib/fetcher";
import { PlusCircle, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import useSWR, { mutate } from "swr";
import Modal from "react-modal";
import axios from "axios";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
interface Amenity {
  id: string;
  name: string;
}
interface AddAmenityToRoomtypeProps {
  roomTypeId: string;
  roomTypeAmenities: string[];
}
const AddAmenityToRoomtype = ({
  roomTypeAmenities,
  roomTypeId,
}: AddAmenityToRoomtypeProps) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [amenity, setAmenity] = React.useState<Amenity[] | []>([]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedAmenities((prev) => [...prev, value]);
    } else {
      setSelectedAmenities((prev) =>
        prev.filter((amenityId) => amenityId !== value)
      );
    }
  };
  const { data } = useSWR(
    `${process.env.NEXT_PUBLIC_URL_API}/api/amenity`,
    fetcher
  );
  useEffect(() => {
    if (data) {
      setAmenity(data.amenity);
    }
  }, [data]);
  const filteredAmenities = (amenity || []).filter(
    (item) => !roomTypeAmenities?.includes(item.id)
  );

  useEffect(() => {
    Modal.setAppElement("#root");
  }, []);
  const handleAddAmenity = async () => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_URL_API}/api/roomtype/${roomTypeId}/amenities`,
        {
          amenityIds: selectedAmenities,
        }
      );
      if (res.data) {
        toast.success("Thêm tiện nghi thành công!");
        setIsOpen(false);
        setSelectedAmenities([]);
        mutate(`${process.env.NEXT_PUBLIC_URL_API}/api/roomtype`);
      }
    } catch (error: any) {
      toast.error(`${error.response.data.message}` || "Thêm không thành công!");
    }
  };
  return (
    <>
      <div className="flex items-center gap-2" onClick={() => setIsOpen(true)}>
        <PlusCircle className="h-6 w-6 cursor-pointer text-blue-500 hover:text-blue-600" />
      </div>
      {isOpen && (
        <Modal
          isOpen={isOpen}
          onRequestClose={() => setIsOpen(false)}
          contentLabel="Cập nhật loại phòng"
          className="bg-white rounded-lg shadow-lg p-6 w-[70%] max-w-md  mt-60 outline-none  "
          overlayClassName="fixed inset-0   bg-black/20 bg-opacity-50 flex justify-center items-start z-50"
        >
          <div className="flex flex-col gap-4">
            <div className="flex justify-between cursor-pointer">
              <h2 className="text-lg font-semibold">
                Thêm tiện nghi cho loại phòng
              </h2>
              <X
                onClick={() => setIsOpen(false)}
                className="text-red-500 hover:text-red-600"
              />
            </div>

            <div className="flex flex-col gap-2">
              {filteredAmenities.map((item) => (
                <div key={item.id} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id={item.id}
                    name={item.name}
                    value={item.id}
                    onChange={handleCheckboxChange}
                    checked={selectedAmenities.includes(item.id)}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor={item.id}>{item.name}</label>
                </div>
              ))}
            </div>
          </div>
          <Button
            onClick={handleAddAmenity}
            disabled={selectedAmenities.length === 0}
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded cursor-pointer"
          >
            Lưu
          </Button>
        </Modal>
      )}
    </>
  );
};

export default AddAmenityToRoomtype;
