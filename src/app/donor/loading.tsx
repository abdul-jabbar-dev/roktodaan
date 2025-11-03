import LoadingAnimation from "@/components/LoadingAnimation"; 
export default function Loading() {
    // Or a custom loading skeleton component
    return (
      <div className="flex items-center justify-center" style={{minHeight: 'calc(100vh - 150px)'}}>
            <LoadingAnimation  />
        </div>
    )
}