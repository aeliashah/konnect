import React, { useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Input, Button, Select, RTE } from '../index'
import service from "../../appwrite/config"
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { addpost } from '../../store/postSlice'
function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || '',
            slug: post?.slug || '',
            content: post?.content || '',
            status: post?.status || 'draft',

        },
    })
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userData = useSelector((state) => state.auth.userData)
    console.log("userData: ",userData.$id)




    const submit = async (data) => {
        if (post) {
            const file = data.image[0] ? await service.uploadFile(data.image[0]) : null

            if (file) {
                service.deleteFile(post.featuredimg)
            }
            const dbPost = await service.updatePost(post.$id, {
                ...data,
                featuredimg: file ? file.$id : undefined,

            })
            if (dbPost) {
                dispatch(addpost(dbPost))
                setTimeout(() => {
                    navigate(`/all-posts`)
                }, 2000)
            }
        } else {
            const file = await service.uploadFile(data.image[0])

            if (file) {
                const fileId = file.$id;
                data.featuredimg = fileId;

                const dbPost = await service.createPost({
                    ...data,
                    userId: userData.$id,
                })
                if (dbPost) {
                    dispatch(addpost(dbPost))
                    setTimeout(() => {
                        navigate(`/all-posts`)
                    }, 2000)
                }
            }

        }
    }
    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string") {
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-z0-9-]+/g, '')
                .replace(/\s/g, '-')
            return ""
        }
    }, [])

    useEffect(() => {
        const subcription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title,
                    { shouldValidate: true }))
            }
        })
        return () => subcription.unsubscribe()
    }, [watch, setValue, slugTransform])

    return (
        <div className='post-form'>

            <form onSubmit={handleSubmit(submit)}>
                <Input
                    label="Title"
                    placeholder="Title"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug"
                    placeholder="Slug"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        const value = e.currentTarget.value;
                        if (typeof value === 'string') {
                            setValue("slug", slugTransform(value), {
                                shouldValidate: true,
                            });
                        }
                    }}
                />
                <RTE
                    label="Content" name="content" control={control}

                    defaultValue={getValues("content")}
                />
                <Input
                    label="featured Image"
                    type="file"
                    accept="image/png, image/jpeg, image/jpg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <img src={service.getFilePreview(post.featuredimg)} alt={post.title} />
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    {...register("status", { required: true })}
                />
                <Button type="submit">{post ? "Update" : "Submit"}</Button>
            </form>
        </div>
    )
}

export default PostForm
