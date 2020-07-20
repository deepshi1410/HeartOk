library(shiny)
library(shinyjs)

fieldsMandatory <- c("aadhar","name")

labelMandatory <- function(label) {
  tagList(
    label,
    span("*", class = "mandatory_star")
  )
}

appCSS <- ".mandatory_star { color: red; }"

shinyUI(
    fluidPage(
      shinyjs::useShinyjs(),
      shinyjs::inlineCSS(appCSS),
      navbarPage("->", id = "inTabset",
        tabPanel("Information",
                 sidebarLayout(position="right",
                               
                               
                               # Entry variables
                               sidebarPanel(h3("Entry variables"),
                                            div(
                                              id = "form",
                                            
                                            textInput("name", labelMandatory("Enter your name"),""),
                                            textInput("aadhar",labelMandatory("Enter your Aadhar UID"),""),
                                            numericInput("age","Enter the patient's age","",min = 0,max = 100,value = 89),
                                            
                                            radioButtons("sex","Select gender",choices = c("male"= 1,"female"=0), selected = 1),
                                            radioButtons("cp","Select the chest pain type",choices = c("Typical angina"=1,"Unstable angina"=2,"Non-anginal pain"=3, "Asymptomatic pain"=4),selected = 1),
                                            numericInput("trestbps","Resting blood pressure(mmHg)",value = 140),
                                            numericInput("chol","Serum cholestoral in mg/dl","120"),
                                            radioButtons("fbs","fasting blood sugar > 120 mg/dl",choices = c("Yes"= 1,"No"=0),selected = 1),
                                            radioButtons("restecg", "Resting electrocardiographic results",choices = c( "normal"=1,
                                                                                                                        " ST-T wave abnormality (T wave inversions and/or ST elevation or depression of > 0.05 mV"=2, 
                                                                                                                        "showing probable or definite left ventricular hypertrophy by Estes' criteria"=3),selected = 2),
                                            
                                            
                                            numericInput("thalach","maximum heart rate achieved",value = 90),
                                            radioButtons("exang" ,"exercise induced angina" ,choices = c("Yes"=1,"No" = 0),selected = 1),
                                            numericInput("oldpeak"," ST depression induced by exercise relative to rest(-2,6)",min=-3,max=6,value =2),
                                            radioButtons("slope" ,"the slope of the peak exercise ST segment " ,choices = c("upslope"=1,"flat" = 2,"downslope"=3),selected = 2),
                                            radioButtons("ca","Number of major vessels(0-3)",choices = c("0"=0,"1"=1,"2"=2,"3"=3),selected = 1),
                                            radioButtons("thal","Thalassemia",choices = c("Normal"=3, "Fixed Defect"=6,"Reversable Defect"=7),selected = 7),
                                            
                                            
                                            actionButton("submit","Submit",class = "btn-primary")
                                            
                                            
                               )),
                               #Display results
                               
                               mainPanel(
                                  ""
                               ))),
        
        tabPanel("Text", value = "panel2", h3(tableOutput("text")),
                 actionButton("jumpToReport", "Jump to Report"),
                 actionButton("jumpToRecords", "Jump to Previous Records")
                 ),
        #tabPanel("Plot", plotOutput("plot")), 
        tabPanel("Previous Records", value = "panel3", tableOutput("table")),
        tabPanel("Report", value = "panel4", htmlOutput("report"))
        
      )
  )
)
