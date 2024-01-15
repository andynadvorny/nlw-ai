import { useState } from 'react'
import { useCompletion } from 'ai/react'
import { Github, Wand2 } from 'lucide-react'
import { Button } from './components/ui/button'
import { Separator } from './components/ui/separator'
import { Textarea } from './components/ui/textarea'
import { Label } from './components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './components/ui/select'
import { Slider } from './components/ui/slider'
import { VideoInputForm } from './components/video-input-form'
import { PromptSelect } from './components/prompt-select'

export function App() {
  const [temperature, setTemperature] = useState(0.5)
  const [videoId, setVideoId] = useState<string | null>(null)

  const {
    input,
    setInput,
    handleInputChange,
    handleSubmit,
    completion,
    isLoading
  } = useCompletion({
    api: 'http://localhost:3333/ai/complete',
    body: {
      videoId,
      temperature,
    }
  })

  return (
    <div className="min-h-screen flex flex-col">
      <header className="px-6 py-3 flex items-center justify-between border-b">
        <h1 className="text-xl font-bold">upload.ai</h1>

        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">Developed with 💜 at NLW</span>

          <Separator orientation="vertical" className="h-6" />

          <Button variant="outline">
            <Github className="w-4 h-4 mr-2" />
            Github
          </Button>
        </div>
      </header>
      <main className="flex-1 p-6 flex gap-6">
        <div className="flex flex-col flex-1 gap-4">
          <div className="grid grid-rows-2 gap-4 flex-1">
            <Textarea 
              className="resize-none p-4 leading-relaxed"
              placeholder="Add your AI prompt..." 
              value={input}
              onChange={handleInputChange}
            />
            <Textarea 
              className="resize-none p-4 leading-relaxed"
              placeholder="AI generated result..." 
              value={completion}
              readOnly 
            />
          </div>
          <p className="text-sm text-muted-foreground">
            Remember: you can include the video <code className="text-violet-400">{'{trascription}'}</code> in your promp by utilizing the variable transcription.
          </p>
        </div>
        <aside className="w-80 space-y-6">
          
          <VideoInputForm onVideoUploaded={setVideoId} />

          <Separator />

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label>Prompt</Label>
              <PromptSelect onPromptSelected={setInput} />
            </div>

            <div className="space-y-2">
              <Label>Model</Label>

              <Select disabled defaultValue='gpt3.5'>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gpt3.5">GPT 3.5-turbo 16k</SelectItem>
                </SelectContent>
              </Select>

              <span className="block text-xs text-muted-foreground italic">You'll be able to customize this option soon</span>
            </div>

            <Separator />

            <div className="space-y-4">
              <Label>Temperature</Label>

              <Slider min={0} max={1} step={0.1} value={[temperature]} onValueChange={ value => setTemperature(value[0]) } />

              <span className="block text-xs text-muted-foreground italic leading-relaxed">Higer values tend to make the result more creative and with possible mistakes</span>
            </div>

            <Separator />

            <Button disabled={isLoading} type="submit" className="w-full">
              Execute
              <Wand2 className="w-4 h-4 ml-2" />
            </Button>
          </form>
        </aside>
      </main>
    </div>
  )
}

