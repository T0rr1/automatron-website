# AI Chatbot Setup Guide

The chatbot now supports both rule-based responses (fallback) and AI-powered responses using OpenAI's GPT-3.5-turbo model.

## Features

### AI-Powered Capabilities
- **Natural Conversations**: Engages in contextual discussions about automation needs
- **Personalized Recommendations**: Suggests services based on user's specific pain points
- **Intelligent Follow-ups**: Asks relevant questions to better understand requirements
- **Business Context Awareness**: Adapts responses based on user's business type and role
- **Service Matching**: Intelligently matches user needs to appropriate service categories

### Fallback System
- Graceful degradation to rule-based responses if AI service is unavailable
- Maintains full functionality even without OpenAI API key
- Error handling with user-friendly messages

## Setup Instructions

### 1. Get OpenAI API Key
1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Create an account or sign in
3. Navigate to API Keys section
4. Create a new API key
5. Copy the key (starts with `sk-`)

### 2. Configure Environment Variables
Add to your `.env.local` file:

```bash
# OpenAI API for Intelligent Chatbot
OPENAI_API_KEY=sk-your-actual-api-key-here
```

### 3. Test the Setup
1. Start the development server: `npm run dev`
2. Open the website and click the chatbot button (bottom right)
3. Try asking questions like:
   - "I spend too much time organizing files"
   - "My email inbox is a mess"
   - "I need help with reporting"
   - "What automation services do you offer?"

## How It Works

### AI System Prompt
The chatbot is trained with a comprehensive system prompt that includes:
- Complete service catalog with pricing and timelines
- Company values and approach (safety-first, practical solutions)
- Conversation flow guidelines
- Personality traits (helpful, consultative, not pushy)

### Intelligent Features
1. **Context Awareness**: Remembers conversation history and user preferences
2. **Service Recommendations**: Analyzes user input to suggest relevant services
3. **Quick Actions**: Dynamically generates relevant action buttons
4. **Time Savings Focus**: Always emphasizes practical benefits and ROI
5. **Natural Language**: Understands various ways users describe their problems

### Example Conversations

**User**: "I'm drowning in Excel reports every week"
**AI Bot**: "That sounds incredibly time-consuming! Creating reports manually can easily eat up 3-6 hours per week. I'd love to help you automate that process. 

Can you tell me more about these reports? For example:
- What data sources do you pull from?
- Are you combining multiple spreadsheets?
- Do you need charts or specific formatting?

Our Reporting Lite service has helped clients save 3-6 hours per week on similar tasks, and we can usually deliver a solution in 1-3 days."

**User**: "My computer setup takes forever when onboarding new employees"
**AI Bot**: "New employee onboarding can be such a bottleneck! Manual PC setup typically takes 4-8 hours per person, which really adds up.

Our PC Onboarding Helpers service can automate:
- Software installation (Office, browsers, industry-specific tools)
- Desktop shortcuts and folder structure
- Default settings and configurations
- Security and compliance setup

Most clients see this pay for itself after just 2-3 new hires. How many new employees do you typically onboard per month?"

## Cost Considerations

### OpenAI API Costs
- GPT-3.5-turbo: ~$0.002 per 1K tokens
- Average conversation: 200-500 tokens
- Estimated cost: $0.0004-$0.001 per conversation
- Monthly cost for 1000 conversations: ~$0.40-$1.00

### Rate Limiting
The API route includes basic rate limiting. For production, consider:
- Implementing Redis-based rate limiting
- User session management
- Conversation length limits

## Customization

### Modifying the AI Personality
Edit `src/lib/chatbot/ai-service.ts` and update the `SYSTEM_PROMPT` constant to:
- Change the tone or personality
- Add new service information
- Modify conversation flow
- Update company-specific details

### Adding New Quick Actions
Update the `determineQuickActions` function to add new action types and logic.

### Service Recommendations
Modify `determineServiceRecommendations` to improve service matching based on keywords or context.

## Troubleshooting

### Chatbot Not Responding Intelligently
If the chatbot gives generic responses instead of personalized ones:

1. **Check OpenAI API Credits**: The most common issue is insufficient OpenAI credits
   - Go to [OpenAI Platform Usage](https://platform.openai.com/usage)
   - Check if you have remaining credits or need to add billing
   - Error code `insufficient_quota` means you need to add credits

2. **Verify API Key**: Check browser console for errors
   - Look for "OpenAI client not initialized" messages
   - Ensure API key starts with `sk-` and is set in `.env.local`

3. **Check API Route**: Verify `/api/chatbot` is accessible
   - Open browser dev tools and check Network tab
   - Look for 500 errors or failed requests

### Enhanced Fallback Mode
Even without AI, the chatbot provides intelligent responses:

- **Context-Aware**: Recognizes file organization, email, reporting keywords
- **Service Matching**: Suggests relevant services based on user input
- **Detailed Information**: Provides specific time savings and service details
- **Smart Actions**: Offers appropriate next steps (calculator, assessment, etc.)

**Example Fallback Responses:**
- "I spend time organizing files" → Detailed Basic Scripting service info
- "Email is a mess" → Email & File Hygiene service details
- "Need help with reports" → Reporting Lite service explanation

### Performance Issues
- AI responses: 1-3 seconds
- Fallback responses: Instant
- Consider response caching for common questions
- Monitor OpenAI API usage and costs

### OpenAI Quota Management
- **Free Tier**: $5 credit (usually 2,000-5,000 conversations)
- **Pay-as-you-go**: $0.002 per 1K tokens (~$0.001 per conversation)
- **Monthly Budget**: Set usage limits in OpenAI dashboard
- **Monitoring**: Track usage at platform.openai.com/usage

## Security Notes

- API key is stored server-side only
- No sensitive user data is sent to OpenAI
- Conversations are not persisted beyond the session
- Rate limiting prevents abuse

## Future Enhancements

Potential improvements:
1. **Conversation Memory**: Persist conversations across sessions
2. **Advanced Analytics**: Track conversation patterns and success metrics
3. **Multi-language Support**: Extend AI responses to Spanish
4. **Integration**: Connect with CRM or project management tools
5. **Voice Support**: Add speech-to-text capabilities
6. **Custom Training**: Fine-tune model on company-specific data
##
 🎯 New Interactive Service Selection Features

### Enhanced Service Recommendations
The chatbot now displays interactive service recommendation cards when suggesting services:

**Service Cards Include:**
- Service icon and name
- Time savings estimate (e.g., "2-5 hrs/week")
- Brief description
- Pricing range ($249-$499)
- Delivery timeline (1-3 days)
- Two action buttons: "Learn More" and "Get Started"

### Interactive Actions
**"Learn More" Button:**
- Opens the specific service page in a new tab
- URL format: `/services/basic-scripting`, `/services/email-file-hygiene`, etc.
- Allows users to explore detailed service information

**"Get Started" Button:**
- Closes the chatbot
- Navigates to contact form with service pre-selected
- URL format: `/contact?service=basic-scripting`
- Shows green notification confirming service selection

### Smart Contact Form Integration
**Pre-selection Features:**
- Service automatically selected in Step 2 of contact form
- Green notification banner shows selected service
- User can still modify selection if needed
- Seamless flow from chatbot recommendation to project initiation

### Test the Enhanced System

Try these messages to see the interactive features:

**File Organization:**
```
User: "I spend too much time organizing files"
Bot: Detailed Basic Scripting info + interactive service card
Actions: Learn More → /services/basic-scripting | Get Started → /contact?service=basic-scripting
```

**Email Management:**
```
User: "My email inbox is chaos"  
Bot: Email & File Hygiene details + service card
Actions: Learn More → /services/email-file-hygiene | Get Started → /contact?service=email-file-hygiene
```

**Reporting Tasks:**
```
User: "I need help with Excel reports"
Bot: Reporting Lite explanation + service card  
Actions: Learn More → /services/reporting-lite | Get Started → /contact?service=reporting-lite
```

### Conversion Flow
1. **Discovery**: User asks about automation needs in chatbot
2. **Recommendation**: Bot provides contextual service suggestions with cards
3. **Exploration**: User clicks "Learn More" to view detailed service info
4. **Conversion**: User clicks "Get Started" to begin project with pre-selected service
5. **Confirmation**: Contact form shows green notification of selected service
6. **Completion**: User completes form with service already selected

This creates a smooth, guided experience from initial inquiry to project initiation, significantly improving conversion rates and user experience.